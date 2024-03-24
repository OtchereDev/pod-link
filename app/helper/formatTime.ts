function getMinutesHour(date: number): number {
  return Math.floor(date / 60);
}

export function formatDate(date: number): string {
  let hours: number;
  let minutes = getMinutesHour(date);

  if (minutes > 60) {
    hours = getMinutesHour(minutes);
    minutes = minutes % (hours * 60);

    return `${hours} hours, ${minutes} minutes`;
  }

  return `${minutes} minutes`;
}

export function formatSliderTime(
  date: number,
  type: "current" | "duration",
  minutes?: number,
): string {
  let currentMinutes: string | number = Math.floor((date ?? minutes) / 60);
  let currentSeconds: string | number = Math.floor(
    (date ?? minutes) - currentMinutes * 60,
  );

  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }

  if (type == "current") {
    return `${currentMinutes}:${currentSeconds}`;
  }

  let durationMinutes: string | number = Math.floor(date / 60);
  let durationSeconds: string | number = Math.floor(
    date - durationMinutes * 60,
  );
  if (durationSeconds < 10) {
    durationSeconds = "0" + durationSeconds;
  }
  if (durationMinutes < 10) {
    durationMinutes = "0" + durationMinutes;
  }

  return `${durationMinutes}:${durationSeconds}`;
}
