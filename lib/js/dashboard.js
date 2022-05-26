/* COUT DE REVIENT N */
const dataN = {
    labels: [
      'Coûts de structure',
      'Coûts d\'entretien',
      'Coûts horaire'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [61.1, 11.7, 27.3],
      backgroundColor: [
        '#0B2B26',
        '#235347',
        '#163832'
      ],
      hoverOffset: 4
    }]
  };

const configN = {
    type: 'doughnut',
    data: dataN,
};

 const myChartN = new Chart(
    document.getElementById('myChartN'),
    configN
); 

/* COUT DE REVIENT N-1 */
const dataN1 = {
    labels: [
      'Coûts de structure',
      'Coûts d\'entretien',
      'Coûts horaire'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [61.1, 11.7, 27.3],
      backgroundColor: [
        '#0B2B26',
        '#235347',
        '#163832'
      ],
      hoverOffset: 4
    }]
  };

const configN1 = {
    type: 'doughnut',
    data: dataN1,
};

 const myChartN1 = new Chart(
    document.getElementById('myChartN1'),
    configN1
); 



/* TRANSPORTS N ET N-1 - BAR GRAPH */
const labels = [
    'label1', 'label2', 'label3',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Année N',
        data: [65, 24, 110],
        backgroundColor: [
            '#0B2B26',
            '#0B2B26',
            '#0B2B26',
        ],
        border: [
            '#235347',
            '#235347',
            '#235347',
        ],
        borderWidth: 2
    },
    {
        label: 'Année N - 1',
        data: [60, 27, 100],
        backgroundColor: [
            '#235347',
            '#235347',
            '#235347',
        ],
        border: [
            '#0B2B26',
            '#0B2B26',
            '#0B2B26',
        ],
        borderWidth: 2
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);
