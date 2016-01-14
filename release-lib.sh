#!/bin/bash
git checkout gh-pages
mv logcatio-1.0.1.aar com/urucas/logcatio/1.0.1/logcatio-1.0.1.aar
git ci com/urucas/logcatio/1.0.1/logcatio-1.0.1.aar -m "update release"
git push origin gh-pages
git checkout master
