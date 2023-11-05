<script lang="ts" setup>
import { computed } from "vue";
import { dateToHuman, HumanDate, humanDateToYMD } from "../../utils/moment";
import CalendarDay from "./Oneday.vue";
import { data } from "../../data/calendar";

const githubContributionsMap = computed(() => {
  const contributionsMap = new Map();
  for (const week of data.weeks) {
    for (const day of week.contributionDays) {
      contributionsMap.set(day.date, {
        count: day.contributionCount,
        color: day.color,
      });
    }
  }
  return contributionsMap;
});

const getDayContributions = (date: string) => {
  return githubContributionsMap.value.get(date)?.count || 0;
};

const getDayGitHubColor = (date: string) => {
  return githubContributionsMap.value.get(date)?.color;
};

// current month | day
const today = new Date();
const todayHuman = dateToHuman(today);
const currentMonthDays = Array.from({ length: todayHuman.day }).map((_, i) => {
  return humanDateToYMD({ ...todayHuman, day: i + 1 });
});
const getPrevMonthFullDays = (date: HumanDate, prevMonths: number) => {
  const targetMonth = new Date(date.year, date.month - prevMonths, 0);
  const daysCount = targetMonth.getDate();
  return Array.from({ length: daysCount }).map((d, i) => {
    return humanDateToYMD({ ...dateToHuman(targetMonth), day: i + 1 });
  });
};

// Show monthly quantity
const months = [
  getPrevMonthFullDays(todayHuman, 7),
  getPrevMonthFullDays(todayHuman, 6),
  getPrevMonthFullDays(todayHuman, 5),
  getPrevMonthFullDays(todayHuman, 4),
  getPrevMonthFullDays(todayHuman, 3),
  getPrevMonthFullDays(todayHuman, 2),
  getPrevMonthFullDays(todayHuman, 1),
  currentMonthDays,
];
</script>

<template>
  <div class="calendar">
    <ul class="aggregate-calendar">
      <li class="month" v-for="(month, index) in months" :key="index">
        <calendar-day
          v-for="(day, i) in month"
          :key="i"
          :date="day"
          :tweets="0"
          :contributions="getDayContributions(day)"
          :github-color="getDayGitHubColor(day)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "../../style/variables";
@import "../../style/mixins";

.calendar {
  width: 630px;
  border-radius: $lg-radius;
  padding: 0.8rem;
  background-color: $module-bg-ashen;
  transition: background-color 0.25s;
}

@media (min-width: 1600px) and (max-width: 3999px) {
  .calendar {
    width: 830px;
  }
}

@media (max-width: 1600px) {
  .calendar {
    width: 630px;
  }
}

.aggregate-calendar {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;

  .month {
    width: auto;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-auto-flow: column;
    grid-auto-columns: min-content;
    grid-gap: 3px;
    scroll-snap-align: start;
  }
}
</style>

