import React, { Component } from 'react';
import {connect} from 'react-redux';
import compose from "lodash.flowright";
import n from 'country-js';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

class Map extends Component {

    componentDidUpdate() {
        // Create map instance
        let chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Exclude Antartica
        polygonSeries.exclude = ["AQ"];

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        let polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.applyOnClones = true;
        polygonTemplate.togglable = true;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.strokeOpacity = 0.5;
        polygonTemplate.polygon.fillOpacity = 0.6;
        polygonSeries.calculateVisualCenter = true;

        // // Create hover state and set alternative fill color
        // let hs = polygonTemplate.states.create("hover");
        // hs.properties.fill = chart.colors.getIndex(0);

        // Zooming to Countries
        let lastSelected;
        polygonTemplate.events.on("hit", function(ev) {
            if (lastSelected) {
                // This line serves multiple purposes:
                // 1. Clicking a country twice actually de-activates, the line below
                //    de-activates it in advance, so the toggle then re-activates, making it
                //    appear as if it was never de-activated to begin with.
                // 2. Previously activated countries should be de-activated.
                lastSelected.isActive = false
                
            }
            ev.target.series.chart.zoomToMapObject(ev.target);
            if (lastSelected !== ev.target) {
                lastSelected = ev.target
            }
        })

        /* Create selected and hover states and set alternative fill color */
        let ss = polygonTemplate.states.create("active");
        ss.properties.fill = chart.colors.getIndex(2);

        let hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(4);

        // Hide Antarctica
        polygonSeries.exclude = ["AQ"];

        // Small map
        chart.smallMap = new am4maps.SmallMap();
        // Re-position to top right (it defaults to bottom left)
        chart.smallMap.align = "right";
        chart.smallMap.valign = "top";
        chart.smallMap.series.push(polygonSeries);

        // Zoom control
        chart.zoomControl = new am4maps.ZoomControl();

        let homeButton = new am4core.Button();
        homeButton.events.on("hit", function(){
            chart.goHome();
        });

        homeButton.icon = new am4core.Sprite();
        homeButton.padding(7, 5, 7, 5);
        homeButton.width = 30;
        homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
        homeButton.marginBottom = 10;
        homeButton.parent = chart.zoomControl;
        homeButton.insertBefore(chart.zoomControl.plusButton);

        // Add image series
        let imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.mapImages.template.tooltipText = "[bold]{name}[/]\n[font-size:13px]Confirmed: {cases}\nDeaths: {value}[/]";
        imageSeries.dataFields.value = "value";

        let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle.radius = 3;
        circle.fillOpacity = 0.7;
        circle.propertyFields.fill = "color";

        let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
        circle2.radius = 3;
        circle.fillOpacity = 0.7;
        circle2.propertyFields.fill = "color";

        circle2.events.on("inited", function(event){
            animateBullet(event.target);
        })
          
        function animateBullet (circle) {
            let animation = circle.animate([{ property: "scale", from: 1, to: 2 }, { property: "opacity", from: 1, to: 0 }], 1000, am4core.ease.circleOut);
            animation.events.on("animationended", function(event){
                animateBullet(event.target.object);
            })
        }

        imageSeries.heatRules.push({
            "target": circle,
            "property": "radius",
            "min": 4,
            "max": 30,
            "dataField": "value"
        })

        const {countriesStats} = this.props;
        let mapData = [];
        if (countriesStats.countries) {
            countriesStats.countries
            .filter(country => (country.country !== "Total:" && country.country !== ""))
            .map(country => {
                let countryInfo = n.search(country.country)[0]
                mapData.push({
                    country: countryInfo ? countryInfo.code : "",
                    name: country.country,
                    latitude: countryInfo ? countryInfo.geo.latitude : "",
                    longitude: countryInfo ? countryInfo.geo.longitude : "",
                    cases: country.cases,
                    value: country.deaths,
                    color: "rgba(246,98,128,1)"
                })
            })
        }

        imageSeries.data = mapData
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
    
    render() {
        return (
            <div id="chartdiv" className="map"></div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        countriesStats: state.countriesStats
    }
}

export default compose(
    connect(mapStateToProps)
)(Map);
