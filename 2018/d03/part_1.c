#include <fcntl.h>
#include <unistd.h>
#include "d03.h"
#include "libft.h"

int	main(void)
{
	int 			fd;
	char 			*line;
	t_whouse 	*list;


	fd = open("puzzle", O_RDONLY);
	while (ft_get_nline(fd, &line))
	{
		// Malloc d'un maillon

		// Recuperer l'id jusqu'a @

		// Recuperer distance de la gauche -> ','

		// Récupérer distance du haut -> ':'

		// Récupérer largeur -> 'x'

		// Récupérer hauteur -> '\n'
		int			       	id;
		int            	fleft;
		int           	ftop;
		int            	width;
		int			       	height;
		struct s_whouse	 *ftop;
	}
	ft_putnbr((count_2 * count_3));
	close(fd);
	return (0);
}
