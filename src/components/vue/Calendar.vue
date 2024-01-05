<script lang="ts" setup>
import { computed, onMounted } from "vue";
import CalendarDay from "./Oneday.vue";
import { dateToHuman, humanDateToYMD } from "@/utils/moment";
import { getGitHubContributions } from "@/server/getters/github";

let data = null;
const props = defineProps<{
  article: any;
}>();

const now = new Date();
const end = now.toISOString();
now.setFullYear(now.getFullYear() - 1);
const start = now.toISOString();

try {
  const res = await getGitHubContributions(start, end);
  data = res;
} catch (error) {
  console.error("Error reading data:", error);
}

const createContributionsMap = (weeks) => {
  const contributionsMap = new Map();
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > 0) {
        contributionsMap.set(day.date, {
          count: day.contributionCount,
          color: day.color,
        });
      }
    }
  }
  return contributionsMap;
};

const githubContributionsMap = computed(() => createContributionsMap(data.weeks));

const articleContributionsMap = computed(() =>
  createContributionsMap(props.article.weeks)
);

const getDayContributions = (date: string) => {
  return githubContributionsMap.value.get(date)?.count || 0;
};

const getDayGitHubColor = (date: string) => {
  return githubContributionsMap.value.get(date)?.color;
};

const getDayArticles = (date: string) => {
  return articleContributionsMap.value.get(date)?.count || 0;
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

// remove placeholders
const onCalendarRendered = () => {
  const skeletonElement = document.getElementById("skeleton");
  if (skeletonElement) {
    skeletonElement.remove();
  }
  const calendarElement = document.getElementById("calendar");
  if (calendarElement) {
    calendarElement.style.display = "block";
  }
};

onMounted(() => {
  onCalendarRendered();
});
</script>

<template>
  <div class="calendar bg-crystalClear dark:bg-slate-800" data-pagefind-ignore>
    <ul class="aggregate-calendar">
      <li class="month" v-for="(month, index) in months" :key="index">
        <calendar-day
          v-for="(day, i) in month"
          :key="i"
          :date="day"
          :tweets="0"
          :articles="getDayArticles(day)"
          :contributions="getDayContributions(day)"
          :github-color="getDayGitHubColor(day)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/mixins";

.calendar {
  border-radius: 4px;
  padding: 0.8rem;
  transition: background-color 0.25s;
}

@media (min-width: 1600px) and (max-width: 3999px) {
  .calendar {
    width: 690px;
  }
}

@media (min-width: 1000px) and (max-width: 1600px) {
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
