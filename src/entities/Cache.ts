import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Cache {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  resourceType!: string;

  @Column()
  resourceId!: string;

  @Column({ type: "json" })
  data!: object;

  @Column({ type: "timestamp" })
  expiry!: Date;
}
