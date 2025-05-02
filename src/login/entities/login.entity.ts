import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Login {
    @PrimaryGeneratedColumn()
    id:number
    
  @Column()
  userId: string;

  @Column()
  userPassWord: string;
}
