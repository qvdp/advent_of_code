/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_bzero.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: qvan-der <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2018/11/12 14:32:51 by qvan-der          #+#    #+#             */
/*   Updated: 2018/11/12 14:35:04 by qvan-der         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"

void	ft_strfill(void *s, int c, size_t n)
{
	unsigned char *s_copy;

	if (s && ft_isascii(c))
	{
		s_copy = (unsigned char*)s;
		while (n)
		{
			*s_copy = c;
			s_copy++;
			n--;
		}
	}


}
