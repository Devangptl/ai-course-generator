
import { boolean, integer, json, pgTable, serial, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList', {
    id:serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    noOfChapter:varchar('noOfChapter').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName'),
    userProfileImage:varchar('userProfileImage'),
    courseBanner:varchar('courseBanner').default('/placeholder.png'),
    publish:boolean('publish').default(false),
    courseViews:integer('courseViews').default(0).notNull(),
    likes:integer('likes').default(0).notNull(),
})


export const Chapters = pgTable('chapters',{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    chapterId:integer('chapterId').notNull(),
    content:json('content').notNull(),
    videoId:varchar('videoId').notNull()
})

export const Comments = pgTable('comments',{
    id:serial('id').primaryKey(),
    commentId: uuid('commentId').defaultRandom(),
    courseId:varchar('courseId').notNull(),
    user:json('user').notNull(),
    content:varchar('content').notNull(),
    createdAt:timestamp('createdAt').notNull().defaultNow(),
    likes:integer('likes').notNull().default(0),
    
})

export const CommentReplies = pgTable('commentReplies',{
    id:serial('id').primaryKey(),
    commentId:varchar('commentId').notNull(),
    user:json('user').notNull(),
    content:varchar('content').notNull(),
    createdAt:timestamp('createdAt').notNull().defaultNow(),
    likes:integer('likes').notNull().default(0),
})