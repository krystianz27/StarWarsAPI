import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Starship {
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
  hyperdriveRating!: string;

  @Column()
  starshipClass!: string;
}
