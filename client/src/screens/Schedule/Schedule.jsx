import React from "react";
import "./Schedule.css";
import Eventcard from "../../components/Eventcard/Eventcard";
import Events from "../../assets/data/events.json";
import Heading from "../../components/Headingv2/Headingv2";
import { useAuth } from "../../AuthContext";

/* ───── Static Data ───── */

const SUBTITLE =
    "From the pulsating beats of the music to the kaleidoscope of colors lighting up the night sky. Here's to reliving those cherished moments and having a blast along the way!";

const DAYS = [
    { key: "saptami", label: "SAPTAMI" },
    { key: "ashtami", label: "ASHTAMI" },
    { key: "navami", label: "NAVAMI" },
    { key: "dashami", label: "DASHAMI" },
];

/**
 * Renders a single placeholder event card.
 * This is a placeholder - actual cards will be implemented later.
 */
const EventCardPlaceholder = ({ event }) => (
    <div className={`event-card-placeholder ${event.featured ? "event-card-placeholder--featured" : ""}`}>
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
    const {allEventsByDay} = useAuth()    
    return (
        <>
            <section className="day-section">
                {/* Day Header with dual-layer title */}
                <div className="day-section__header">
                    <Heading title={day.label} />
                </div>

                {/* Timeline */}
                <div className="day-section__timeline">
                    {/* Placeholder event cards - to be replaced with actual cards later */}
                    <div className="timeline__events-container">
                        <Eventcard Eventdata={allEventsByDay[day.key]} Eventday={day.label} />
                    </div>
                </div>
            </section>

            {/* Decorative arrow between Saptami and Ashtami sections */}
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
                    <img src="/assets/imgs/Schedule/eventsMainHeader.webp" alt="Events banner" />
                </div>

                <div className="schedule-header__content">
                    <div className="schedule-header__title-wrapper">
                        <Heading title={"EVENTS"} />
                    </div>
                    <p className="schedule-header__subtitle">{SUBTITLE}</p>
                </div>
            </header>

            <main className="schedule-days">
                {DAYS.map((day, index) => (
                    <DaySection key={day.key} day={day} showDecorativeArrow={index === 0} />
                ))}
            </main>
        </div>
    );
};

export default Schedule;
