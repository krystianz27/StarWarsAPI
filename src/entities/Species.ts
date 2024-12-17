import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  language!: string;

  @Column({ type: "float" })
  averageLifespan!: number;

  @Column()
  classification!: string;

  @Column()
  designation!: string;
}
