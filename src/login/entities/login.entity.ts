import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('login')
export class Login {
    @PrimaryGeneratedColumn()
    id:number
    
  @Column()
  userId: string;

  @Column()
  userPassWord: string;
}
