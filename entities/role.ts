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

export enum Roles {
  SUPERADMIN = 'superadmin',
  HOST = 'host',
  ADMIN = 'admin',
  GUEST = 'guest',
  MUTED = 'muted',
  BANNED = 'banned',
}

@Entity()
export default class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: Roles, default: Roles.GUEST })
  role: Roles

  @ManyToOne(() => Profile, (profile) => profile.roles)
  profile: Profile

  @ManyToOne(() => Channel, (channel) => channel.roles)
  channel: Channel

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
};
