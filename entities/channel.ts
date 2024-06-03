import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Profile from './profile';
import Comment from './comment';
import Role from './role';

export enum Statuses {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity()
export default class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  title: string

  @Column({ nullable: false })
  description: string

  @Column({ type: 'enum', enum: Statuses, default: Statuses.ACTIVE })
  status: Statuses

  @OneToMany(() => Profile, (profile) => profile.channels)
  host: Profile

  @OneToMany(() => Comment, (comment) => comment.channel)
  comments: Comment[]

  @OneToMany(() => Role, (role) => role.channel)
  roles: Role[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
};
