function floodFill(canvas, ctx, x, y, red, green, blue) {
	var x, y, z, currentColor, neighbors;
	var imgObject = ctx.getImageData(0, 0, canvas.width, canvas.height);
	var data = imgObject.data;

	z = (y*canvas.width+x)*4;
	var found = new Set([z]);
	var waiting = [z]
	var startColor = ((data[z] & 0xFF) << 24) | ((data[z+1] & 0xFF) << 16) | ((data[z+2] & 0xFF) << 8) | (data[z+3] & 0xFF);
    while (waiting.length > 0) {
		v = waiting.pop();
		data[v] = red;
		data[v+1] = green;
		data[v+2] = blue;
		data[v+3] = 255;
		
		var x = Math.floor(v/4) % canvas.width;
		var y = Math.floor(Math.floor(v/4) / canvas.width);
		neighbors = [];
		
		if (y > 0)
			neighbors.push(((y-1)*canvas.width+x)*4);
		if (y+1 < canvas.height)
			neighbors.push(((y+1)*canvas.width+x)*4);
		if (x > 0)
			neighbors.push((y*canvas.width+x-1)*4);
		if (x+1 < canvas.width)
			neighbors.push((y*canvas.width+x+1)*4);
			
		for (var i=0; i<neighbors.length; i++) {
			z = neighbors[i];
			currentColor = ((data[z] & 0xFF) << 24) | ((data[z+1] & 0xFF) << 16) | ((data[z+2] & 0xFF) << 8) | (data[z+3] & 0xFF);
			
			if (!found.has(z) && currentColor == startColor) {
				found.add(z);
				waiting.push(z);
			}
		}
	}
	ctx.putImageData(imgObject, 0, 0, 0, 0, canvas.width, canvas.height);
}
