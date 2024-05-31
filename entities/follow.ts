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
export default class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Profile, (profile) => profile.followers)
  followed: Profile

  @ManyToOne(() => Profile, (profile) => profile.following)
  follower: Profile

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
};
