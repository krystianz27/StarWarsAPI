import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  model!: string;

  @Column()
  manufacturer!: string;

  @Column({ type: "float" })
  costInCredits!: number;

  @Column({ type: "float" })
  length!: number;

  @Column()
  crew!: string;

  @Column()
  passengers!: string;
}
