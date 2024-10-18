import NewPublicationProvider from "../context/NewPublicationProvider";
import HomePage from "../pages/HomePage";
import InvitationPage from "../pages/middlePage/InvitationPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import ExplorePage from "../pages/middlePage/ExplorePage";
import NewPublicationPage from "../pages/NewPublicationPage";
import PublicationPrivatePage from "../pages/PublicationPrivatePage";
import PublicationPublicPage from "../pages/PublicationPublicPage";
import PublicationEditPage from "../pages/PublicationEditPage";
import SignUpPage from "../pages/SignUpPage";
import AboutUs from "../pages/AboutUsPage";
import WhatIsJournalPage from '../pages/WhatIsJournelPage'
import TermsPage from "../pages/TermsPage";
import AccuracyPage from '../pages/AccuracyPage'
import FaqPage from '../pages/FaqPage'
import ProfilePage from "../pages/ProfilePage";
import ProfilePublicPage from "../pages/ProfilePublicPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import PublicationPage from '../pages/middlePage/PublicationPage'
import AffiliationPage from "../pages/middlePage/AffiliationPage";
import EducationPage from "../pages/middlePage/EducationPage";
import AffiliationMainPage from '../pages/AffiliationPage'
import EducationMainPage from '../pages/EducationPage'
import ResearchInterestPage from "../pages/middlePage/ResearchInterestPage";
import ResearchInterestMainPage from '../pages/ResearchInterestPage'
import WebOfScienceCategoriesPage from "../pages/WebOfScienceCategoriesPage";
import PrivacyPage from "../pages/PrivacyPage";
export const nav = [

    {
        path: "/",
        element: <MainPage />,
        isMenu: false,
        isPrivate: false,
    },
    {
        path: "/publication/:id",
        element: <PublicationPublicPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/forget-password",
        element: <ForgetPasswordPage />,
        isMenu: false,
        isPrivate: false,
    },
    {
        path: "/reset-password",
        element: <ResetPasswordPage />,
        isMenu: false,
        isPrivate: false,
    },
    {
        path: "/",
        element: <HomePage />,
        isMenu: true,
        isPrivate: true,
        children: [
            {
                path: "/",
                element: <ExplorePage />,
                isMenu: true,
                isPrivate: true
            },
            {
                path: "/invitation",
                element: <InvitationPage />,
                isMenu: true,
                isPrivate: true
            },

        ]

    },
    {
        path: "/researcher/:userId",
        element: <ProfilePage />,
        isMenu: true,
        isPrivate: true,
        children: [
            {
                path: "",
                element: <PublicationPage />,
                isMenu: true,
                isPrivate: true
            },
            {
                path: "affiliation",
                element: <AffiliationPage />,
                isMenu: true,
                isPrivate: true
            },
            {
                path: "education",
                element: <EducationPage />,
                isMenu: true,
                isPrivate: true
            },
            {
                path: "research-interest",
                element: <ResearchInterestPage />,
                isMenu: true,
                isPrivate: true
            },
        ]
    },
    {
        path: "/affiliation-edit",
        element: <AffiliationMainPage />,
        isMenu: true,
        isPrivate: true,
    },
    {
        path: "/web-of-science-category-edit",
        element: <WebOfScienceCategoriesPage />,
        isMenu: true,
        isPrivate: true,
    },
    {
        path: "/education-edit",
        element: <EducationMainPage />,
        isMenu: true,
        isPrivate: true,
    },
    {
        path: "/research-interest-edit",
        element: <ResearchInterestMainPage />,
        isMenu: true,
        isPrivate: true,
    },
    {
        path: "/researcher/:userId",
        element: <ProfilePublicPage />,
        isMenu: false,
        isPrivate: false,
        children: [
            {
                path: "",
                element: <PublicationPage />,
                isMenu: false,
                isPrivate: false
            },
            {
                path: "affiliation",
                element: <AffiliationPage />,
                isMenu: false,
                isPrivate: false
            },
            {
                path: "education",
                element: <EducationPage />,
                isMenu: false,
                isPrivate: false
            },
            {
                path: "research-interest",
                element: <ResearchInterestPage />,
                isMenu: false,
                isPrivate: false
            },
        ]
    },
    {
        path: "/publication/:id",
        element: <PublicationPrivatePage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/edit-publication/:publicationId",
        element: <PublicationEditPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/accuracy",
        element: <AccuracyPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/faq",
        element: <FaqPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/faq",
        element: <FaqPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/accuracy",
        element: <AccuracyPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/privacy",
        element: <PrivacyPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/privacy",
        element: <PrivacyPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/terms",
        element: <TermsPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/terms",
        element: <TermsPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/whatIs",
        element: <WhatIsJournalPage />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/whatIs",
        element: <WhatIsJournalPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/aboutUs",
        element: <AboutUs />,
        isMenu: true,
        isPrivate: true
    },
    {
        path: "/aboutUs",
        element: <AboutUs />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/login",
        element: <LoginPage />,
        isMenu: false,
        isPrivate: false
    },

    {
        path: "/signup",
        element: <SignUpPage />,
        isMenu: false,
        isPrivate: false
    },
    {
        path: "/new-publication",

        element: <NewPublicationProvider><NewPublicationPage /></NewPublicationProvider>,
        isMenu: true,
        isPrivate: true
    },



]


