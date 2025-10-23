const config = {
  title: 'Joel Xiao | Full-Stack Developer',
  description: {
    long: 'Explore the portfolio of Joel Xiao, a full-stack developer and creative technologist specializing in interactive web experiences, 3D animations, and innovative projects. Discover my latest work, including Coding Ducks, The Booking Desk, Ghostchat, and more. Let\'s build something amazing together!',
    short:
      'Discover the portfolio of Joel Xiao, a full-stack developer creating interactive web experiences and innovative projects.',
  },
  keywords: [
    'Joel',
    'Xiao',
    'portfolio',
    'full-stack developer',
    'creative technologist',
    'web development',
    '3D animations',
    'interactive websites',
    'Coding Ducks',
    'The Booking Desk',
    'Ghostchat',
    'web design',
    'GSAP',
    'React',
    'Next.js',
    'Spline',
    'Framer Motion',
  ],
  author: 'Joel Xiao',
  email: 'xiao2731962667@gmail.com',
  resume: '/resume/JoelXiao_FullStackFrontend_Resume.pdf',
  site: '/',

  get ogImg() {
    return `${this.site}/assets/seo/og-image.png`
  },
  social: {
    twitter: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    github: 'https://github.com/joel-xiao',
  },
}
export { config }
