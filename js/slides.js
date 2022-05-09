const slides01 = [
  {
    title: "",
    content: `
      `,
    phase: 'philadelphia',
    showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: true,
    emphasis: false,
  },
  {
    title: "La Finquita",
    content: `
      Our story begins in a small corner of northeast Philadelphia called
      La Finquita.
      `,
    phase: 'finquita',
    showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: true,
    emphasis: false,
  },
  {
    title: "",
    content: `
      La Finquita —"the little farm" in Spanish—was a thriving community garden
      located on a vacant lot in the Kensington neighborhood of Philadelphia.
      For decades, La Finquita provided a source of much-needed fresh produce to
      residents and community members.
      <br></br>
      <img src='img/slide09_finquita.jpg' alt='Community Garden'>
    `,
    phase: 'finquitaZoom',
    showpopups: true,
    // bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: false,
  },
  {
    title: "",
    content: `
      ...that is, until the spring of 2019 when La Finquita <a href='https://
      whyy.org/articles/how-one-urban-farm-was-lost-la-finquitas-finale/'>
      permanently closed.</a>
      <br></br>
      <img src='img/slide02_finquita.png' alt='Empty Lot'>
      <br></br>
      If you walk past La Finquita today, you would never know that this empty
      plot was but a few short years ago a bustling urban garden beloved by
      community members from all across the neighborhood.
    `,
    phase: 'finquitaZoom',
    // showpopups: true,
    // bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: true,
  },
  {
    title: "Vacant Lots in Philadelphia",
    content: `
      La Finquita is only one of over <b>27,000</b> vacant lots across
      Philadelphia, many of which serve a variety of cherished community uses,
      from urban gardens to public parks to small side yards.
      <br></br>Over the last several years, however, community assets like La
      Finquita have faced a growing threat. The City of Philadelphia has been
      foreclosing on vacant properties in bulk, forcibly selling them via public
      auction.
      <br></br>Often, neighbors who have tended to these properties for years do
      not find out that they are up for sale until they have already been
      bought.
      `,
    phase: 'vacant',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: false,
  }
];

const slides02 = [
  {
    title: "Vacant Lots",
    content: `
      <img src='img/points-01.png' class='points' alt='diagram of vacant lots'>
      <br>Of the more than 580,000 properties in Philadelphia, approximately
      <b>27,000</b> or <b>4.71%</b> were vacant in 2021.
      `,
    phase: 'vacant',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: false,
  },
  {
    title: "Real Estate Tax Delinquencies",
    content: `
      <img src='img/points-02.png' class='points' alt='diagram of delinquencies'>
      <br>
      Of all <b>27,000</b> vacant properties in Philadelphia, approximately
      <b>27.5%</b> are tax delinquent. That means that nearly <b>7,500</b>
      vacant properties are at risk of tax foreclosure across Philadelphia.
      `,
    phase: 'delinquent',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: true,
  },
  {
    title: "US Bank Liens",
    content: `
      <img src='img/points-03.png' class='points' alt='diagram us bank liens'>
      To complicate matters further, more than <b>1,500</b> vacant properties
      are encumbered by debt that is held by U.S. Bank. In the late 1990s, the
      City of Philadelphia faced a school funding crisis, so in a desperate bid
      to obtain financing, it bundled and securitized thousands of tax liens and
      <a href='https://www.inquirer.com/news/philadelphia-community-garden-tax-l
      ien-us-bank-gentrification-20211006.html'>sold them to U.S. Bank</a>. As
      a private financial institution, U.S. Bank can independently initiate
      foreclosure proceedings, without notice or input from local community
      members.
      `,
    phase: 'usbank',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: true,
  },
  {
    title: "Sheriff Sales",
    content: `
      <img src='img/points-04.png' class='points' alt='diagram of sheriff sales
      '>At least <b>8,750</b> vacant lots throughout the City of Philadelphia
      have been sold or are scheduled to be sold at a sheriff sale. This number
      has skyrocketed in recent years.
      <br></br>
      Sheriff sales increased exponentially over the decade following the 2008
      subprime mortgage crisis, rising with the tide of the broader real estate
      market. Despite a recent dip in sheriff sales during the coronavirus
      pandemic, this trend is likely transient since the Philadelphia Sheriff's
      Office moved auctions online, greatly expanding the pool of potential
      buyers.
      <br></br>
      <img src='img/sheriff-chart.png' alt='diagram of sheriff sales'>

      `,
    phase: 'sheriff',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: true,
  }
];

const slides03 = [
  {
    title: "",
    content: `
      Placeholder.
      `,
    phase: 'permits',
    year: 2007,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: false,
  },
  {
    title: "Zoning Permits in 2007",
    content: `
      In 2007, the City of Philadelphia issued <b>2586</b> zoning permits related
      to new construction or demolition. Over the next few years, this number
      fell likely due to the subprime mortgage crisis of 2008, before bouncing
      back around 2012.
      `,
    phase: 'permits',
    year: 2007,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: false,
  },
  {
    title: "...in 2012",
    content: `
      In 2012, the number of zoning permits returned to pre-Great Recession
      levels, totalling <b>2521</b>. At that time, development activity
      concentrated around three hotspots outside the city center: the Graduate
      Hospital-Point Breeze area to the southeast, the Northern
      Liberties-Fishtown neighborhoods to the northeast, and the area west of
      Broad Street between Fairmount and Cecil B. Moore Avenue.
      `,
    phase: 'permits',
    year: 2012,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: false,
  },
  {
    title: "...and in 2017",
    content: `
      Cut to 2017, the number of zoning permits totaled <b>3234</b> and
      expanded outwards from previous hotspots and into the Kensington, Point
      Breeze, and Fairmount neighborhoods.
      <br></br>
      Since 2017, development activity has continued to increase and expand
      outwards into neighborhoods across Philadelphia, including those where
      vacant lots are in great supply.
      `,
    phase: 'permits',
    year: 2017,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: false,
    emphasis: false,
  }
];

const slides04 = [
  {
    title: "",
    content: `
      `,
    phase: 'minority',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: true,
    emphasis: false,
  },
  {
    title: "Majority Minority Neighborhoods",
    content: `
      Because vacant properties tend to cluster in specific neighborhoods, the
      impact of the rise in tax foreclosures is disparate across demographic
      categories. Areas that have a <b>majority non-white population</b>
      contain a far greater share of vacant and tax delinquent properties than
      those that are majority white.
      <img src='img/disparity-02.png' alt='Racial disparity chart'>
    `,
    phase: 'minority',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: true,
    emphasis: true,
  },
  {
    title: "...and Sub-Median Income Neighborhoods",
    content: `
      Similarly, areas that have a population lying below the median income
      line contain more vacant and tax delinquent properties than those lying
      above the median income line. These demographic patterns show that when
      the City of Philadelphia or U.S. Bank decides to foreclose on a vacant
      property, the impact is not felt equally across demographic groups.
      <img src='img/disparity-01.png' alt='Racial disparity chart'>
    `,
    phase: 'income',
    // showpopups: true,
    bounds: [[39.9, -75.35], [40.16, -74.87]],
    philly: true,
    emphasis: true,
  },
  {
    title: "The Development Frontier: Kensington",
    content: `
      The neighborhood that perhaps most embodies the growing demand for vacant
      lots is Kensington. Here, new development has begun to spill over into the
      neighborhood from the hot real estate markets of Fishtown and Northern
       on its east and south sides, respectively.
    `,
    phase: 'kensington',
    // showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]],
    philly: false,
    emphasis: false,
  },
  {
    title: "Vacant Lots in Kensington",
    content: `
      Evidence of this development wave is seen in how there are far fewer
      available vacant lots in Kensington in the southeast adjacent to
      Fishtown and Northern Liberties, whereas a greater number of vacant lots
      remain undeveloped in the northwest quadrant of the neighborhood.
      As new development continues its gradual creep northward, these remaining
      vacant lots may well decline in number over time.
    `,
    phase: 'vacantLand',
    // showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]],
    philly: false,
    emphasis: false,
  },
  {
    title: "Kensington's Community Gardens",
    content: `
      As vacant land in Kensington has become more attractive to new
      development, vacant lots that have been used by the surrounding community
      have come under pressure.
      <br></br>
      Kensington’s community gardens serve as a poignant example.
      <br></br>
      La Finquita, the community garden where our story began, was one such
      vacant lot in Kensington until it was ultimately sold in 2019. The same
      fate awaits numerous other community assets in Kensington—and beyond—
      if no action is taken to protect them.
    `,
    phase: 'garden',
    showpopups: true,
    bounds: [[39.96869, -75.14654], [39.98648, -75.13045]],
    philly: false,
    emphasis: false,
  },
  {
    title: "Cesar Iglesias Community Garden",
    content: `
      One community asset in Kensington whose future remains uncertain is the
      César Andreu Iglesias Community Garden.
      Located in northwest Kensington where development activity is still only
      just beginning to heat up, the Iglesias Community Garden has been the
      site of a long campaign by neighbors to preserve its community use. This
      effort is still underway since the site was partially bought by a private
      developer and is now at risk of being shut down.
      <br></br>
      <img src='img/slide10_cesar.png' alt='Community Garden'>
    `,
    phase: 'gardenZoom',
    showpopups: true,
    philly: false,
    emphasis: false,
  }
];
