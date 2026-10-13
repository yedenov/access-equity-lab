# Study protocol

## Status

Exploratory computational prototype; no collected human-subject data and no field deployment.

## Estimand and assumptions

Which candidate facility maximizes additional population coverage under a fixed straight-line distance threshold?

Weighted coverage counts residents within a Euclidean radius in a local projected coordinate system (kilometres). Every candidate is evaluated exhaustively, so the best one-facility addition is exact for this finite candidate set. Ties preserve input order. This is a geometric accessibility proxy: roads, terrain, opening hours, capacity and affordability are excluded. Do not interpret distances as walking times.

## Data dictionary

radiusKm: positive number; demand: [{id,x,y,population}]; facilities and candidates: [{id,x,y}]. Coordinates must use the SAME local projected CRS expressed in kilometres, NOT latitude/longitude. IDs unique within each list. Use aggregated population cells; exclude household or personal locations.

## Reproduction

Run `node --test` and `node cli.mjs data/demo.json results`. The demo is deterministic and uses no network services. The result embeds input values. Synthetic data were manually constructed to exercise the model; no location names refer to real observations.

## Validation plan

1. Register the real study question and analysis window before inspecting outcomes.
2. Record source URL, retrieval date, license, units, spatial/temporal resolution and missingness.
3. Compare calculations against hand calculations and an independent reference implementation.
4. Vary assumptions and report sensitivity; distinguish scenario bounds from sampling uncertainty.
5. Have a domain specialist assess external validity. Report failures and limitations.

## Ethics and interpretation

Use public aggregate data with compatible terms; avoid personal records. Do not treat computed rankings or scenarios as operational recommendations. There are no established beneficiary counts, publications, partnerships or impact claims.

## Reference

https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cdist.html
