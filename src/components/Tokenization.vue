<template>
  <div class="app">
    <div class="producers">
      <div class="producer-list-heading box heading">
        <h2>List of Producers</h2>
      </div>
      <div class="producer-list box">
        <ol>
          <li
            class="overflow-text"
            v-for="(account, index) in accounts"
            v-bind:key="index"
            :class="{highlight:index == selected}"
            @click="selected = index"
          >{{account}}</li>
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
</template>

<script>
import { oliCoinContract } from "../assets/js/contract.js";
import { web3 } from "../assets/js/contract.js";

export default {
  name: "Tokenization",
  data() {
    return {
      accounts: [],
      selected: undefined
    };
  },
  methods: {
    getProducerAccountsList: function() {
      this.accounts = [];
      oliCoinContract.methods
        .getProducerAccountsList()
        .call((error, result) => {
          if (!error) {
            result.shift();
            result.forEach(account => {
              this.accounts.push(account);
            });
          } else {
            console.log(error);
          }
        });
    }
  },
  // set default function on page load
  created: function() {
    this.getProducerAccountsList();
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
  width: 85%;
  padding: 20px;
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 40px;
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

.producers,
.main-details {
  width: 45%;
  display: flex;
  flex-direction: column;
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
  background: #cccccc;
}

li.highlight {
  background-color: #8cd98c;
}

.overflow-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
