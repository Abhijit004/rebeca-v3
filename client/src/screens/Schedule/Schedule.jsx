import React from "react";
import "./Schedule.css";
import Eventcard from "../../components/Eventcard/Eventcard";
import Events from "../../assets/data/events.json";

/* ───── Static Data ───── */

const SUBTITLE =
    "From the pulsating beats of the music to the kaleidoscope of colors lighting up the night sky. Here's to reliving those cherished moments and having a blast along the way!";

const TIME_SLOTS = ["10am", "11am", "12pm", "02:30pm", "04:30pm", "06:00pm", "08:00pm"];

const DAYS = [
    { key: "saptami", label: "SAPTAMI" },
    { key: "ashtami", label: "ASHTAMI" },
    { key: "navami", label: "NAVAMI" },
    { key: "dashami", label: "DASHAMI" },
];

// Placeholder event data for layout structure
const PLACEHOLDER_EVENTS = [
    { name: "inaugration", featured: true, icon: "/assets/icons/external-link.svg" },
    { name: "Saturnwalia", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "Arrival", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "Arrival", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "Arrival", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "Arrival", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "Arrival", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "Arrival", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "Typists Journey", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "Verse Wars", featured: true, icon: "/assets/icons/external-link.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
    { name: "inaugration", featured: false, icon: "/assets/icons/rotate.svg" },
];

const eventDataByDay = {
    saptami: Events.saptami,
    ashtami: Events.ashtami,
    navami: Events.navami,
    dashami: Events.dashami,
};

/* ───── Sub-Components ───── */

/**
 * Renders a single placeholder event card.
 * This is a placeholder - actual cards will be implemented later.
 */
const EventCardPlaceholder = ({ event }) => (
    <div className={`event-card-placeholder ${event.featured ? 'event-card-placeholder--featured' : ''}`}>
        <div className="event-card-placeholder__icon">
            <img src={event.icon} alt="" />
        </div>
        <div className="event-card-placeholder__name">{event.name}</div>
    </div>
);

/**
 * Renders one day section with title, time labels, and placeholder event cards.
 */
const DaySection = ({ day, showDecorativeArrow }) => {
    return (
        <>
            <section className="day-section">
                {/* Day Header with dual-layer title */}
                <div className="day-section__header">
                    <div className="day-section__title-wrapper">
                        <h2 className="day-section__title-main">{day.label}</h2>
                        <h2 className="day-section__title-secondary">{day.label}</h2>
                    </div>
                </div>

                {/* Timeline */}
                <div className="day-section__timeline">

                    {/* Placeholder event cards - to be replaced with actual cards later */}
                    <div className="timeline__events-container">
                        <Eventcard Eventdata={eventDataByDay[day.key].eventList} Eventday={day.label} />
                    </div>

                    
                </div>
            </section>

            {/* Decorative arrow between Saptami and Ashtami sections */}
            {showDecorativeArrow && (
                <div className="decorative-arrow">
                    <img src="/assets/icons/decorative-arrow.svg" alt="" />
                </div>
            )}
        </>
    );
};

/* ───── Main Schedule (Events) Page ───── */

const Schedule = () => {
    return (
        <div className="schedule-page">
            {/* Hero Header */}
            <header className="schedule-header">
                <div className="schedule-header__bg">
                    <img
                        src="/assets/imgs/Schedule/eventsMainHeader.webp"
                        alt="Events banner"
                    />
                </div>

                <div className="schedule-header__content">
                    <div className="schedule-header__title-wrapper">
                        <h1 className="schedule-header__title-main">EVENTS</h1>
                        <h1 className="schedule-header__title-secondary">EVENTS</h1>
                    </div>
                    <p className="schedule-header__subtitle">{SUBTITLE}</p>
                </div>
            </header>

            {/* Day Sections */}
            <main className="schedule-days">
                {DAYS.map((day, index) => (
                    <DaySection
                        key={day.key}
                        day={day}
                        showDecorativeArrow={index === 0}
                    />
                ))}
            </main>
        </div>
    );
};

export default Schedule;
