-- Enhanced production schema with indexes and constraints
CREATE TABLE storm_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_date TIMESTAMPTZ NOT NULL,
    location GEOGRAPHY(Point) NOT NULL,
    hail_size DECIMAL(3,1),
    wind_speed DECIMAL(5,2),
    severity INTEGER CHECK (severity BETWEEN 1 AND 10),
    affected_area GEOGRAPHY(Polygon),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_storm_events_location ON storm_events USING GIST(location);
CREATE INDEX idx_storm_events_date ON storm_events(event_date);