import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Planet {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  climate!: string;

  @Column()
  population!: string;

  @Column()
  terrain!: string;
}
