import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum UserRole {
  //Esses aqui são os cargos que pensei, talvez adicionar professor depois seja interessante
  ADMIN = 'admin',
  USER = 'user',

}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({
    type: 'text', //Talvez mudar pra enum depois, coloquei text pra poder salvar no sqlite e não dar erro nos testes
    default: UserRole.USER
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

}