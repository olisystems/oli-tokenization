<template>
  <div class="app">
    <div class="top-bar">
      <div class="total-producer top-bar-col">
        <div class="top-bar-box head-col1">
          <h4>Total Producers</h4>
        </div>
        <div class="top-bar-box">
          <h3>{{totalProducers}}</h3>
        </div>
      </div>

      <div class="total-energy-production top-bar-col">
        <div class="top-bar-box head-col2">
          <h4>Total Energy Production</h4>
        </div>
        <div class="top-bar-box">
          <h3>{{totalEnergy}}</h3>
          <span>kWh</span>
        </div>
      </div>

      <div class="total-minted-coins top-bar-col">
        <div class="top-bar-box head-col3">
          <h4>Total Minted Coins</h4>
        </div>
        <div class="top-bar-box">
          <h3>{{totalMintedCoins}}</h3>
          <span>OLC</span>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="producers">
        <div class="producer-list-heading box heading">
          <h2 @click="getTotalEnergy">List of Producers</h2>
        </div>
        <div class="producer-list box">
          <ol>
            <li
              class="overflow-text"
              v-for="(producer, index) in producers"
              v-bind:key="index"
              :class="{highlight:index == selected}"
              @click="getTotalEnergy"
            >{{producer}}</li>
          </ol>
        </div>
      </div>

      <div class="main-details">
        <div class="inforgraphics">
          <div class="production-details">
            <div class="production-heading box">
              <h4>Total Production</h4>
            </div>
            <div class="production-value box">1000 kW</div>
          </div>

          <div class="coin-details">
            <div class="coin-heading box">
              <h4>Total Coins</h4>
            </div>
            <div class="coin-value box">1 OLC</div>
          </div>
        </div>
        <div class="producer-details">
          <div class="producer-details-heading box">
            <h3>Producer Details</h3>
          </div>
          <div class="details box">
            <ul>
              <li>producer details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { oliCoinContract } from "../assets/js/contract.js";
import { web3 } from "../assets/js/contract.js";

export default {
  name: "Tokenization",
  data() {
    return {
      producers: [],
      totalProducers: "",
      totalEnergy: "",
      totalMintedCoins: "",
      selected: undefined
    };
  },
  methods: {
    getProducers: function() {
      this.totalProducers = "";
      this.totalEnergy = "";
      this.totalMintedCoins = "";
      this.producers = [];
      oliCoinContract.methods
        .getProducerAccountsList()
        .call((error, result) => {
          if (!error) {
            result.shift();
            result.forEach(producer => {
              this.producers.push(producer);
            });
            this.totalProducers = result.length;
            this.getTotalEnergy();
            this.getTotalMintedCoins();
          } else {
            console.log(error);
          }
        });
    },
    getTotalEnergy: function() {
      oliCoinContract.methods.getTotalEnergyProduced().call((error, result) => {
        if (!error) {
          this.totalEnergy = result;
        } else {
          console.log(error);
        }
      });
    },
    getTotalMintedCoins: function() {
      oliCoinContract.methods.getTotalMintedCoins().call((error, result) => {
        if (!error) {
          this.totalMintedCoins = result;
        } else {
          console.log(error);
        }
      });
    }
  },
  // set default function on page load
  created: function() {
    this.getProducers();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin-bottom: 4px;
  color: #666769;
}
.app {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.top-bar {
  padding: 20px;
  display: flex;
  text-align: center;
}

.top-bar-col {
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: auto;
  justify-content: space-between;
}

.top-bar-box {
  background: white;
  padding: 10px;
  padding-top: 1px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}

div.top-bar-box.head-col1 {
  background-color: #c0dbe2;
  margin-bottom: 0;
}
div.top-bar-box.head-col2 {
  background-color: #cdf1c3;
  margin-bottom: 0;
}
div.top-bar-box.head-col3 {
  background-color: #ccb9da;
  margin-bottom: 0;
}

.container {
  display: flex;
  width: 90%;
  justify-content: space-between;
  margin: auto;
  align-items: flex-start;
  padding: 20px;
}

.producers,
.main-details {
  width: 45%;
  display: flex;
  flex-direction: column;
}

.box {
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
}
h1,
h2,
h3,
h4 {
  text-transform: uppercase;
}

.inforgraphics {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: auto;
}

.production-details,
.coin-details {
  width: 49%;
  display: flex;
  flex-direction: column;
}

ol > li {
  list-style-position: inside;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-left: -25px;
  transition: font-size 0.3s ease, background-color 0.3s ease;
}

ol > li:hover {
  background: #bbbbbb;
}

li.highlight {
  background-color: #cccc;
  /* background-color: #8cd98c; */
}

.overflow-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
