import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import Profile from './profile';
import Channel from './channel';

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  text: string

  @ManyToOne(() => Profile, (profile) => profile.comments)
  profile: Profile

  @ManyToOne(() => Channel, (channel) => channel.comments)
  channel: Channel

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
};
