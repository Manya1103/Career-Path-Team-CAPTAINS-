import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const streams = pgTable("streams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // FontAwesome icon name
  color: text("color").notNull(), // Color for styling
  careerPaths: integer("career_paths").notNull(),
});

export const insertStreamSchema = createInsertSchema(streams).pick({
  name: true,
  slug: true,
  description: true,
  icon: true,
  color: true,
  careerPaths: true,
});

export type Stream = typeof streams.$inferSelect;
export type InsertStream = z.infer<typeof insertStreamSchema>;

export const roadmaps = pgTable("roadmaps", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  streamId: integer("stream_id").notNull(),
  duration: text("duration").notNull(), // Example: "4-5 years"
  degree: text("degree").notNull(), // Example: "B.Tech/B.E."
  exams: text("exams").array().notNull(), // Array of exam names
  color: text("color").notNull(), // Color for styling
  featured: boolean("featured").default(false),
});

export const insertRoadmapSchema = createInsertSchema(roadmaps).pick({
  title: true,
  slug: true,
  description: true,
  streamId: true,
  duration: true,
  degree: true,
  exams: true,
  color: true,
  featured: true,
});

export type Roadmap = typeof roadmaps.$inferSelect;
export type InsertRoadmap = z.infer<typeof insertRoadmapSchema>;

export const roadmapNodes = pgTable("roadmap_nodes", {
  id: serial("id").primaryKey(),
  roadmapId: integer("roadmap_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(), // "step", "exam", "choice", etc.
  description: text("description").notNull(),
  details: jsonb("details").notNull(), // JSON object with additional details specific to node type
  position: jsonb("position").notNull(), // x, y position in the flow
});

export const insertRoadmapNodeSchema = createInsertSchema(roadmapNodes).pick({
  roadmapId: true,
  title: true,
  type: true,
  description: true,
  details: true,
  position: true,
});

export type RoadmapNode = typeof roadmapNodes.$inferSelect;
export type InsertRoadmapNode = z.infer<typeof insertRoadmapNodeSchema>;

export const roadmapEdges = pgTable("roadmap_edges", {
  id: serial("id").primaryKey(),
  roadmapId: integer("roadmap_id").notNull(),
  source: text("source").notNull(), // source node id
  target: text("target").notNull(), // target node id
  label: text("label"),
});

export const insertRoadmapEdgeSchema = createInsertSchema(roadmapEdges).pick({
  roadmapId: true,
  source: true,
  target: true,
  label: true,
});

export type RoadmapEdge = typeof roadmapEdges.$inferSelect;
export type InsertRoadmapEdge = z.infer<typeof insertRoadmapEdgeSchema>;

export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Engineering, Medical, etc.
  eligibility: text("eligibility").notNull(),
  frequency: text("frequency").notNull(),
  importantDates: text("important_dates").notNull(),
  color: text("color").notNull(), // Color for styling
});

export const insertExamSchema = createInsertSchema(exams).pick({
  name: true,
  slug: true,
  description: true,
  category: true,
  eligibility: true,
  frequency: true,
  importantDates: true,
  color: true,
});

export type Exam = typeof exams.$inferSelect;
export type InsertExam = z.infer<typeof insertExamSchema>;

export const colleges = pgTable("colleges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(), // Engineering, Medical, etc.
  entrance: text("entrance").array().notNull(), // Array of entrance exams
  location: text("location").notNull(),
  rating: integer("rating").notNull(),
});

export const insertCollegeSchema = createInsertSchema(colleges).pick({
  name: true,
  slug: true,
  description: true,
  category: true,
  entrance: true,
  location: true,
  rating: true,
});

export type College = typeof colleges.$inferSelect;
export type InsertCollege = z.infer<typeof insertCollegeSchema>;
