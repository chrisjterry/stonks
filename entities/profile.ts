import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Follow from './follow';
import Notification from './notification';

@Entity()
export default class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  fullName: string

  @Column({ nullable: false, unique: true })
  username: string
  
  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: false })
  password: string

  @Column()
  avatar: string

  @Column({ default: true })
  active: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Follow, (follow) => follow.followed)
  followers: Follow[]

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[]

  @OneToMany(() => Notification, (notfication) => notfication.profile)
  notifications: Notification[]
};
