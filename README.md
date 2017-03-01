# pcc-life-expectancy

A quick experiment using some open data sets from Plymouth City Council to show life expectancy by neighbourhood over the years the data is available.

This combines the neighbourhood delineations data: 

- http://thedata.place/dataset/plymouth-neighbourhood-boundaries

and the life expectancy data:

- http://thedata.place/dataset/life-expectancy-plymouth

The app interpolates a colour from red / green range based on the average life expectancy for a neighbourhood in a particular year, so: 

- RED = Shorter average life expectancy
- GREEN = Longer average life expectancy

Drag the slider on the top-right to change the year and roll your mouse over the neighbourhood for it's name and the stats.

I had to do a bunch of geospatial data conversion to get Google Maps to correctly recognise the co-ordinate types of the geoJSON, which was a pain.No build-process / minification on this, it's just a quick prototype!

#Stack:

- Google Maps + API
- geoJSON loading / rendering / styling
- jQuery (for speed of development, not style ;) )
- plain ol' CSS


##Any issues, please fix via pull-request!


