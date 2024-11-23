import LandingPage from '../components/home/LandingPage';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import MemberOverview from '../components/content/member/view/overview/MemberOverview';
import BioEntryView from '../components/content/member/view/bio-entry/BioEntryView';
import FitnessEntryView from '../components/content/member/view/fitness-entry/FitnessEntryView';
import NutritionEntryView from '../components/content/member/view/nutrition-entry/NutritionEntryView';
import MemberProfile from '../components/content/member/view/profile/MemberProfile';
import MemberSettings from '../components/content/member/view/setting/MemberSettings';
import AdminOverview from '../components/content/admin/view/overview/AdminOverview';
import NotFound from '../components/common/NotFound';

const routes = {
  public: [
    {
      name: 'LandingPage',
      path: '/',
      element: LandingPage,
      params: {},
    },
    {
      name: 'Login',
      path: '/auth/login',
      element: Login,
      params: {},
    },
    {
      name: 'Register',
      path: '/auth/register',
      element: Register,
      params: {},
    },
    {
      name: 'NotFound',
      path: '/404',
      element: NotFound,
      params: {},
    },
  ],
  member: [
    {
      name: 'MemberOverview',
      path: '/boards/members/:memberId/overview',
      element: MemberOverview,
      params: { memberId: 0 },
    },
    {
      name: 'BioEntryView',
      path: '/boards/members/:memberId/bio',
      element: BioEntryView,
      params: { memberId: 0 },
    },
    {
      name: 'FitnessEntryView',
      path: '/boards/members/:memberId/fitness',
      element: FitnessEntryView,
      params: { memberId: 0 },
    },
    {
      name: 'NutritionEntryView',
      path: '/boards/members/:memberId/nutrition',
      element: NutritionEntryView,
      params: { memberId: 0 },
    },
    {
      name: 'MemberProfile',
      path: '/boards/members/:memberId/profile',
      element: MemberProfile,
      params: { memberId: 0 },
    },
    {
      name: 'MemberSettings',
      path: '/boards/members/:memberId/settings',
      element: MemberSettings,
      params: { memberId: 0 },
    },
  ],
  admin: [
    {
      name: 'AdminOverview',
      path: '/boards/admin/:memberId/overview',
      element: AdminOverview,
      params: { memberId: 0 },
    },
  ],
};

export default routes;
