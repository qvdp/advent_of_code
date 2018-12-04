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

#include <string.h>

void	ft_bzero(void *s, size_t n)
{
	unsigned char *s_copy;

	if (n <= 0)
		return ;
	s_copy = (unsigned char*)s;
	while (n)
	{
		*s_copy = '\0';
		s_copy++;
		n--;
	}
}
