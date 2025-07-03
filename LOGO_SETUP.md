# Logo Setup Instructions

## Adding Your Logo to the SESWA Platform

To add your logo "images (2).png" to the project:

### Step 1: Copy and Rename the Logo File
1. Copy your logo file "images (2).png" 
2. Paste it into the `frontend/public/` directory
3. Rename it from "images (2).png" to "logo.png"

### Step 2: File Location
The logo should be located at:
```
frontend/public/logo.png
```

### Step 3: Logo Component Usage
The Logo component has been created at `frontend/src/components/Logo.jsx` and supports:

- **Different sizes**: `sm`, `md`, `lg`, `xl`
- **With/without text**: `showText={true/false}`
- **Color variants**: `default`, `white`
- **Automatic fallback**: If image fails to load, shows "SESWA" text logo

### Example Usage:
```jsx
import Logo from './components/Logo';

// Default logo with text
<Logo />

// Small logo without text
<Logo size="sm" showText={false} />

// Large white logo for dark backgrounds
<Logo size="lg" variant="white" />
```

### Logo Specifications:
- **Recommended format**: PNG with transparent background
- **Recommended size**: 200x200px or larger (square aspect ratio works best)
- **File size**: Keep under 100KB for optimal loading

### Fallback Behavior:
If the logo image fails to load, the component automatically shows a styled "SESWA" text logo as fallback.

---

**Next Steps**: Once you've added the logo file, the frontend will automatically use it throughout the application in the header, footer, and other components.
