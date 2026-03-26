import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateContactDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name!: string;
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email!: string;
  @IsString({ message: 'El número de teléfono debe ser una cadena de texto' })
  @IsOptional()
  @IsPhoneNumber('MX', { message: 'El número de teléfono no es válido' })
  phone?: string;
}