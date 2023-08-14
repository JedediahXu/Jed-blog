<script lang="ts" setup>
import { dateToHuman, HumanDate, humanDateToYMD } from "../utils/moment";
import CalendarDay from "./day.vue";

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
        <calendar-day v-for="(day, i) in month" :key="i" :date="day" :tweets="0" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/variables";
@import "../style/mixins";

.calendar {
  margin-bottom: $gap * 2;
  border-radius: $lg-radius;
  padding: $gap;
  background-color: rgba(255, 255, 255, 0.6);
    transition: background-color 0.25s;
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
    grid-gap: 5px;
    @include scroll-snap-item();
  }
}
</style>
