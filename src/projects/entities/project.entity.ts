import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  github: string
}
