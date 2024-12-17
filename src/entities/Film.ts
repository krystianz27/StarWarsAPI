import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  director!: string;

  @Column({ type: "text" })
  openingCrawl!: string;

  @Column({ type: "date" })
  releaseDate!: Date;
}
