import React from 'react';
import ProfilePage from '../pages/ProtectRoute/Profile/index';
import FavoriteRestaurantsPage from '../pages/ProtectRoute/FavoriteRestaurants/index';
import PaymentHistoryPage from '../pages/ProtectRoute/PaymentHistory/index';
import OrderHistoryPage from '../pages/ProtectRoute/OrderHistory/index';
import UpdatePaymentInformationPage from '../pages/ProtectRoute/UpdatePaymentInfo/index';
import UpdatePersonInformationPage from '../pages/ProtectRoute/UpdatePersonInfo';
import ReviewHistoryPage from '../pages/ProtectRoute/ReviewHistory';
import ExplorePage from '../pages/PublicRoute/Explore';
import PaymentPage from '../pages/PublicRoute/Payment';
import LeaveReviewPage from '../pages/PublicRoute/LeaveReview';
import AboutUsPage from '../pages/PublicRoute/AboutUs';
import FAQPage from '../pages/PublicRoute/FAQ';
import LandingPage from '../pages/PublicRoute/Landing';
import PricingPage from '../pages/PublicRoute/Pricing';
import ContactPage from '../pages/PublicRoute/Contact';
import RegistrationPage from '../pages/Auth/Registration';
import LoginPage from '../pages/Auth/Login';
import ForgotPasswordPage from '../pages/Auth/ForgotPassword';
import PrivacyPage from '../pages/PublicRoute/Privacy';
import TermsPage from '../pages/PublicRoute/Terms';
import WelcomePage from '../pages/Auth/Welcome';

import { Redirect } from 'react-router-dom';

const token = window.localStorage.getItem('token');

// const token = 1;

const ProtectPage = [
	{
		path: '/profile',
		component: token ? <ProfilePage /> : <Redirect to='/login' />,
		isExact: true,
	},
	{
		path: '/payment/history',
		component: token ? <PaymentHistoryPage /> : <Redirect to='/login' />,
		isExact: true,
	},
	{
		path: '/order/history',
		component: token ? <OrderHistoryPage /> : <Redirect to='/login' />,
		isExact: true,
	},
	{
		path: '/update/payment',
		component: token ? (
			<UpdatePaymentInformationPage />
		) : (
			<Redirect to='/login' />
		),
		isExact: true,
	},
	{
		path: '/update/profile',
		component: token ? (
			<UpdatePersonInformationPage />
		) : (
			<Redirect to='/login' />
		),
		isExact: true,
	},
	{
		path: '/review/history',
		component: token ? <ReviewHistoryPage /> : <Redirect to='/login' />,
		isExact: true,
	},
	{
		path: '/favorite/restaurants',
		component: token ? <FavoriteRestaurantsPage /> : <Redirect to='/login' />,
		isExact: true,
	},
];
const PublicPage = [
	{
		path: '/',
		component: <ExplorePage />,
		isExact: true,
	},
	{
		path: '/payment',
		component: <PaymentPage />,
		isExact: true,
	},

	{
		path: '/review/leave',
		component: <LeaveReviewPage />,
		isExact: true,
	},
	{
		path: '/about',
		component: <AboutUsPage />,
		isExact: true,
	},
	{
		path: '/faq',
		component: <FAQPage />,
		isExact: true,
	},
	{
		path: '/landing',
		component: <LandingPage />,
		isExact: true,
	},
	{
		path: '/pricing',
		component: <PricingPage />,
		isExact: true,
	},
	{
		path: '/contact',
		component: <ContactPage />,
		isExact: true,
	},
	{
		path: '/privacy',
		component: <PrivacyPage />,
		isExact: true,
	},
	{
		path: '/terms',
		component: <TermsPage />,
		isExact: true,
	},
];
const AuthPage = [
	{
		path: '/registration',
		component: <RegistrationPage />,
		isExact: true,
	},
	{
		path: '/login',
		component: <LoginPage />,
		isExact: true,
	},
	{
		path: '/welcome',
		component: <WelcomePage />,
		isExact: true,
	},
	{
		path: '/password/forgot',
		component: <ForgotPasswordPage />,
		isExact: true,
	},
];

const Page = {
	ProtectPage,
	PublicPage,
	AuthPage,
};

export default Page;
