import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import RoadmapDetail from "@/pages/RoadmapDetail";
import StreamDetail from "@/pages/StreamDetail";
import ExamDetail from "@/pages/ExamDetail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/roadmap/:slug" component={RoadmapDetail} />
      <Route path="/stream/:slug" component={StreamDetail} />
      <Route path="/exam/:slug" component={ExamDetail} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
