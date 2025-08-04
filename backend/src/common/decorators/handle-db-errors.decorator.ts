import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

// descriptor es un objeto que describe el comportamiento del metodo
export function HandleDbErrors(): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value as (...args: any[]) => Promise<any>;

    if (typeof originalMethod !== 'function') {
      throw new Error('El decorador HandleDbErrors solo se puede aplicar en metodos ');
    }
    descriptor.value = async function (...args: any[]) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof QueryFailedError) {
          const driverError = error.driverError as { code: string; detail: string };

          const match = driverError.detail.match(/\((.*?)\)=\((.*?)\)/);
          const field = match?.[1];
          const value = match?.[2];

          switch (driverError.code) {
            case '23505': // violacion constraint unique
              throw new ConflictException('Dato duplicado', {
                description: `El dato ${field} con el valor ${value} ya existe`,
              });

            case '23503': // clave foranea invalida
              throw new BadRequestException('Violacion de clave foránea', {
                description: `El dato ${field} con el valor ${value} no existe`,
              });

            case '23502': // campo requerido no puede ser null
              throw new BadRequestException('Campo obligatorio no puede ser null', {
                description: driverError.detail,
              });

            case '22P02': // formato invalido tipo de dato incorrecto
              throw new BadRequestException('Formato de dato incorrecto', {
                description: driverError.detail,
              });

            default:
              throw new InternalServerErrorException('Error en la base de datos', {
                description: 'Ocurrio un error al interactuar con la base de datos',
              });
          }
        }

        if (error instanceof HttpException) {
          throw error;
        }
        throw new ServiceUnavailableException('No se pudo conectar a la base de datos');
      }
    };
    return descriptor;
  };
}
