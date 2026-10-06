import { Route, Router, Switch } from "wouter";
import { SiteShell } from "@/components/site/SiteShell";
import { BagProvider } from "@/components/site/SiteContext";
import Home from "@/pages/Home";
import About from "@/pages/About";
import { CategoryPage, FurniturePage, ProductPage } from "@/pages/Furniture";
import { InteriorDesignPage, ProjectDetailPage, ProjectsPage } from "@/pages/DesignProjects";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import { BASE_PATH } from "@/lib/utils";

export default function App({ ssrPath }: { ssrPath?: string }) {
  return <Router base={BASE_PATH} ssrPath={ssrPath}>
    <BagProvider>
      <SiteShell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/furniture" component={FurniturePage} />
          <Route path="/furniture/category/:category" component={CategoryPage} />
          <Route path="/furniture/product/:slug" component={ProductPage} />
          <Route path="/interior-design" component={InteriorDesignPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/projects/:slug" component={ProjectDetailPage} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </SiteShell>
    </BagProvider>
  </Router>;
}
