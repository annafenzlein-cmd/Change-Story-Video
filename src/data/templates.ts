import { ChangeStoryProject } from '../types';

export const INITIAL_TEMPLATES: ChangeStoryProject[] = [
  {
    id: 'proj-1',
    title: 'Cloud Migration & Agile Transformation',
    logline: 'How our engineering team transitioned from legacy mainframes to a lightning-fast cloud architecture.',
    category: 'Business',
    status: 'In Production',
    targetAudience: 'Company Stakeholders & Engineers',
    tone: 'Professional',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    scenes: [
      {
        id: 'scene-1-1',
        sceneNumber: 1,
        title: 'The Legacy Bottleneck',
        duration: '6s',
        visualPrompt: 'Dark server room with blinking red lights and frustrated developers looking at lagging monitors',
        narration: 'For years, our legacy systems held us back with slow deployments and constant downtime.',
        transition: 'Fade In'
      },
      {
        id: 'scene-1-2',
        sceneNumber: 2,
        title: 'The Cloud Vision',
        duration: '7s',
        visualPrompt: 'Bright futuristic cloud network nodes glowing in vibrant blue and purple gradients',
        narration: 'We made the bold decision to migrate to a scalable, serverless cloud infrastructure.',
        transition: 'Slide Left'
      },
      {
        id: 'scene-1-3',
        sceneNumber: 3,
        title: 'Accelerated Impact',
        duration: '6s',
        visualPrompt: 'Happy team celebrating in a modern sunlit office with dashboards showing 99.99% uptime',
        narration: 'Today, deployments are 10x faster, reliability is rock solid, and our customers love the speed.',
        transition: 'Zoom In'
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'Brand Evolution: Reimagining EcoWear',
    logline: 'From a small boutique store to a global sustainable fashion movement.',
    category: 'Brand',
    status: 'Draft',
    targetAudience: 'Conscious Consumers & Retail Partners',
    tone: 'Inspirational',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    scenes: [
      {
        id: 'scene-2-1',
        sceneNumber: 1,
        title: 'The Root Problem',
        duration: '5s',
        visualPrompt: 'Montage of fast fashion textile waste and grey industrial pollution',
        narration: 'Fast fashion is choking our planet. We knew we had to spark a revolution.',
        transition: 'Fade In'
      },
      {
        id: 'scene-2-2',
        sceneNumber: 2,
        title: 'The Sustainable Shift',
        duration: '7s',
        visualPrompt: 'Lush organic cotton fields and artisans crafting garments with natural plant dyes',
        narration: 'EcoWear was reborn with 100% biodegradable materials and ethical fair-trade supply chains.',
        transition: 'Wipe Right'
      },
      {
        id: 'scene-2-3',
        sceneNumber: 3,
        title: 'A Greener Tomorrow',
        duration: '6s',
        visualPrompt: 'Diverse joyful models wearing vibrant green and earthy garments in a sunny botanical park',
        narration: 'Join us in wearing your values. Together, we are changing fashion for good.',
        transition: 'Cross Dissolve'
      }
    ]
  }
];
