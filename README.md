# Access Equity Lab

Доступность социальных объектов и выбор места нового объекта

**Research prototype · synthetic demo data · no validated field impact**

## Research question

Which candidate facility maximizes additional population coverage under a fixed straight-line distance threshold?

## Why this matters

This tool supports transparent exploration of a public-interest planning question. It can be adapted to Kazakhstan after obtaining appropriate local data. It does not establish outcomes for any real community.

## Run in two minutes

Requires Node.js 22 or newer. No external packages, credentials or network needed.

```sh
node --test
node cli.mjs data/demo.json results
```

Open [the demo report](results/report.html) in a browser, or inspect [machine-readable results](results/result.json). To use your own data: `node cli.mjs my-data.json my-results`. Paths resolve relative to the current directory. Run commands from the repository root.

## Method

Weighted coverage counts residents within a Euclidean radius in a local projected coordinate system (kilometres). Every candidate is evaluated exhaustively, so the best one-facility addition is exact for this finite candidate set. Ties preserve input order. This is a geometric accessibility proxy: roads, terrain, opening hours, capacity and affordability are excluded. Do not interpret distances as walking times.

Reference: [primary method documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.distance.cdist.html). The reference supports the method, not this prototype's validity or impact.

## Input contract

radiusKm: positive number; demand: [{id,x,y,population}]; facilities and candidates: [{id,x,y}]. Coordinates must use the SAME local projected CRS expressed in kilometres, NOT latitude/longitude. IDs unique within each list. Use aggregated population cells; exclude household or personal locations.

See [example input](data/demo.json), [model](src/model.mjs), [methodology](docs/METHODOLOGY.md), and [tests](test/model.test.mjs). Inputs fail explicitly when required numeric values are invalid. JSON does not support NaN or Infinity.

## Evidence and next study

The committed example is a hand-constructed fixture, not an empirical study. Test outputs check arithmetic and edge cases; they do not validate applicability to Kazakhstan. Before real use, document provenance and licensing, compare results with an independent implementation, assess data completeness and bias, and have a domain specialist review assumptions. Publish validation results including negative findings.

## Для портфолио

Прототип помогает показать понимание методики и воспроизводимости. Его нельзя описывать как завершённое полевое исследование, внедрение или доказанное улучшение жизни людей. Следующий шаг — реальные открытые данные, проверка с профильным специалистом и документированный личный вклад.

## Development and attribution

Initial implementation and documentation were generated with AI assistance at the portfolio owner's request. No prior research history, institutional affiliation or individual scientific contribution is asserted. The owner should review, understand and extend the work before making personal contribution claims.

MIT licensed code and synthetic fixtures. Third-party sources retain their own terms. See [contribution guide](CONTRIBUTING.md).
