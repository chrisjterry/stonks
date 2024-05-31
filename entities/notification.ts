import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import Profile from './profile';

@Entity()
export default class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  text: string

  @ManyToOne(() => Profile, (profile) => profile.notifications)
  profile: Profile

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
};
