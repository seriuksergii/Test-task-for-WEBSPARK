document.addEventListener('DOMContentLoaded', () => {
  const startInput = document.querySelector('.calendar_range_start');
  const finishInput = document.querySelector('.calendar_range_finish');
  const selectedDates = { start: null, finish: null };

  const formatDate = (date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}_${month}_${year}`;
  };

  const startDatepicker = new AirDatepicker(startInput, {
    dateFormat: 'd_m_Y',
    onSelect: ({ date }) => {
      if (date) {
        selectedDates.start = date;
        startInput.value = formatDate(date);
        if (selectedDates.finish && date > selectedDates.finish) {
          selectedDates.finish = null;
          finishInput.value = '';
        }
        startDatepicker.hide();
      }
    },
    isMobile: false,
    onShow: () => {
      finishDatepicker.hide();
    },
  });

  const finishDatepicker = new AirDatepicker(finishInput, {
    dateFormat: 'd_m_Y',
    onSelect: ({ date }) => {
      if (date) {
        selectedDates.finish = date;
        finishInput.value = formatDate(date);
        if (selectedDates.start && date < selectedDates.start) {
          selectedDates.start = null;
          startInput.value = '';
        }
        finishDatepicker.hide();
      }
    },
    isMobile: false,
    onShow: () => {
      startDatepicker.hide();
    },
  });

  document.querySelectorAll('.plus-icon').forEach((icon) => {
    icon.addEventListener('click', function (e) {
      e.stopPropagation();
      const input = this.closest('.calendar_input_wrapper').querySelector('input');
      const isStart = input === startInput;
      const datepicker = isStart ? startDatepicker : finishDatepicker;
      const dateKey = isStart ? 'start' : 'finish';

      if (selectedDates[dateKey]) {
        input.value = '';
        selectedDates[dateKey] = null;
        datepicker.clear();
      } else {
        datepicker.show();
      }
    });
  });

  [startInput, finishInput].forEach((input) => {
    input.addEventListener('click', function (e) {
      e.stopPropagation();
      const isStart = input === startInput;
      const datepicker = isStart ? startDatepicker : finishDatepicker;
      datepicker.show();
    });
  });

  document.addEventListener('click', (e) => {
    const isClickInside = e.target.closest('.calendar_input_wrapper') || 
                          e.target.closest('.air-datepicker');
    if (!isClickInside) {
      startDatepicker.hide();
      finishDatepicker.hide();
    }
  });
});
