import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Routes for Streams
  app.get("/api/streams", async (_req, res) => {
    try {
      const streams = await storage.getStreams();
      res.json(streams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch streams" });
    }
  });

  app.get("/api/streams/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const stream = await storage.getStreamBySlug(slug);
      
      if (!stream) {
        return res.status(404).json({ error: "Stream not found" });
      }
      
      res.json(stream);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stream" });
    }
  });

  // Add this to routes.ts
// Add this to routes.ts
app.get("/api/streams/id/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid stream ID" });
    }
    
    const stream = await storage.getStreamById(id);
    
    if (!stream) {
      return res.status(404).json({ error: "Stream not found" });
    }
    
    res.json(stream);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stream" });
  }
});

  // Routes for Roadmaps - REORDERED
  app.get("/api/roadmaps", async (_req, res) => {
    try {
      const roadmaps = await storage.getRoadmaps();
      res.json(roadmaps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roadmaps" });
    }
  });

  app.get("/api/roadmaps/featured", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const roadmaps = await storage.getFeaturedRoadmaps(limit);
      res.json(roadmaps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured roadmaps" });
    }
  });

  app.get("/api/roadmaps/stream/:streamId", async (req, res) => {
    try {
      const streamId = parseInt(req.params.streamId);
      
      if (isNaN(streamId)) {
        return res.status(400).json({ error: "Invalid stream ID" });
      }
      
      const roadmaps = await storage.getRoadmapsByStreamId(streamId);
      res.json(roadmaps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roadmaps by stream" });
    }
  });

  // Routes for Roadmap Nodes and Edges - MOVED UP BEFORE GENERIC SLUG
  app.get("/api/roadmaps/:roadmapId/nodes", async (req, res) => {
    try {
      const roadmapId = parseInt(req.params.roadmapId);
      
      if (isNaN(roadmapId)) {
        return res.status(400).json({ error: "Invalid roadmap ID" });
      }
      
      const nodes = await storage.getRoadmapNodes(roadmapId);
      res.json(nodes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roadmap nodes" });
    }
  });

  app.get("/api/roadmaps/:roadmapId/edges", async (req, res) => {
    try {
      const roadmapId = parseInt(req.params.roadmapId);
      
      if (isNaN(roadmapId)) {
        return res.status(400).json({ error: "Invalid roadmap ID" });
      }
      
      const edges = await storage.getRoadmapEdges(roadmapId);
      res.json(edges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roadmap edges" });
    }
  });

  app.get("/api/roadmaps/:slug/flow", async (req, res) => {
    try {
      const { slug } = req.params;
      const roadmap = await storage.getRoadmapBySlug(slug);
      
      if (!roadmap) {
        return res.status(404).json({ error: "Roadmap not found" });
      }
      
      const nodes = await storage.getRoadmapNodes(roadmap.id);
      const edges = await storage.getRoadmapEdges(roadmap.id);
      
      res.json({
        roadmap,
        nodes,
        edges
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roadmap flow data" });
    }
  });

  // Generic slug route MOVED TO END
  app.get("/api/roadmaps/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const roadmap = await storage.getRoadmapBySlug(slug);
      
      if (!roadmap) {
        return res.status(404).json({ error: "Roadmap not found" });
      }
      
      res.json(roadmap);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch roadmap" });
    }
  });

  // Rest of routes remain unchanged
  app.get("/api/exams", async (_req, res) => {
    try {
      const exams = await storage.getExams();
      res.json(exams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exams" });
    }
  });

  app.get("/api/exams/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const exam = await storage.getExamBySlug(slug);
      
      if (!exam) {
        return res.status(404).json({ error: "Exam not found" });
      }
      
      res.json(exam);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exam" });
    }
  });

  // Routes for Colleges
  app.get("/api/colleges", async (_req, res) => {
    try {
      const colleges = await storage.getColleges();
      res.json(colleges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch colleges" });
    }
  });

  app.get("/api/colleges/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const college = await storage.getCollegeBySlug(slug);
      
      if (!college) {
        return res.status(404).json({ error: "College not found" });
      }
      
      res.json(college);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch college" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
