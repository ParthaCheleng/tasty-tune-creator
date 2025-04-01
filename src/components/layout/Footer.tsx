
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <h3 className="font-serif font-semibold text-xl">TastyTune</h3>
            <p className="text-muted-foreground text-sm">
              Discover recipes tailored to your tastes, dietary preferences, and available ingredients.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors">Profile</Link></li>
              <li><Link to="/preferences" className="text-muted-foreground hover:text-foreground transition-colors">Preferences</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground">Breakfast</span></li>
              <li><span className="text-muted-foreground">Lunch</span></li>
              <li><span className="text-muted-foreground">Dinner</span></li>
              <li><span className="text-muted-foreground">Desserts</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-muted-foreground">Terms of Use</span></li>
              <li><span className="text-muted-foreground">Privacy Policy</span></li>
              <li><span className="text-muted-foreground">Cookie Policy</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TastyTune. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Made with ❤️ for good food</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
