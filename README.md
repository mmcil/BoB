<h1 align="center">
  Project: Bot of Bitcoin
</h1>
<h2 align="center">
</h2>

## About
This is a new project that will consist of 4 sub-projects which are:

- agent:
  consists of 2 subservices: grabber -> backend (NodeJS), screener -> frontend (ReactJS)
    * grabber: gets the coin market data from https://www.tradingview.com
    * screener: displays the market data in charts using tradingview/lightweight-charts 
    (https://github.com/tradingview/lightweight-charts)

- researcher:
  consists of 2 NodeJS backend subservices: 
    * analyzer: finds the coins which are at their lowest levels, sorts them acc. to their estimated profit percentage
    * notifier: sends notifications based on the results of the analyzer

- dealer:
  consists of 2 subservices: tashboard -> frontend (ReactJS), binancbot -> backend (NodeJS)
    * tashboard: gets spot-wallet, open orders and trade history to display the coin with its possible profit margin
    * binancbot: automatizes HTTP requests for trading on Binance using Binance APIs (https://github.com/binance)  
 
- autobot: 
  automatizes everything based on different trading strategies 

## Development
This project will be written in Javascript. Some of the sub-projects might be changed into Java Spring Boot or .Net Core framework in the future depending on the performance of analytical operations in JavaScript. 

## Contributing
Feel free to point out any faults in any of the projects as it will help to make further improvements. 

## Supporting
You can support this free and open source software by:
- Starring this GitHub repository,
- Creating pull requests, 
- Submitting bugs, 
- Suggesting new features or documentation updates.

## Donations
Donations are based on voluntariness and received in both Bitcoin (BTC <img src="https://github.com/mmcil/BoB/blob/main/images/btc_symbol.jpg" width="30" height="30" style="vertical-align:top"/>) and Monero (XMR <img src="https://github.com/mmcil/BoB/blob/main/images/xmr_symbol.png" width="30" height="30" style="vertical-align:top"/>)  to the following addresses:

<div align="center">
  <h3 align="center">Bitcoin (BTC):</h3>
  <img src="https://github.com/mmcil/BoB/blob/main/images/btc_address.png" width="200" height="200"/>
</div>

<div align="center">
  <h3 align="center">Monero (XMR):</h3>
  <img src="https://github.com/mmcil/BoB/blob/main/images/xmr_address.png" width="200" height="200"/>
</div>


No fiat currencies are accepted. 

## License
Copyright (c) 2021 MMC, CIL INDUSTRIES INC.

All source code and related files including documentation and wiki pages are licensed under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).

See the [LICENSE](https://github.com/mmcil/BoB/blob/main/LICENSE) for more details.
