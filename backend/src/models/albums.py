from dataclasses import dataclass

@dataclass(frozen=True)
class Album:
    id: int
    title: str
    artist: str
    image_url: str
    date_released: str
    rating: int | None
    date_listened: str | None
    favorite_song: str | None
    recommended_by: str | None
    ranking: int | None
    spotify_id: str | None
    url: str
    queue_position: int | None